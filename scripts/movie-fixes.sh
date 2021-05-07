#! /bin/bash
source $HOME/.aliases

set -e

dryrun=0
while getopts "d" opt; do
    case ${opt} in
    d) # process option a
        dryrun=1
        ;;
    \?)
        echo "Usage: movie-fixes.sh [-d]"
        ;;
    esac
done
shift $((OPTIND - 1))

plex_library_get_url="${JARVIS_API_URL}/plex/library/1?onlyHd=1"
plex_refresh_library="${JARVIS_API_URL}/plex/refreshLibrary/1"
handbrake_preset='Very Fast 1080p30'

curl "${plex_refresh_library}"
readarray -t files < <(curl -k "${plex_library_get_url}" | jq -r '.libraryContents|.[]|.Media[0].Part[0].file')
if [ $dryrun -ne 0 ]; then
    echo "curl ${plex_library_get_url}"
fi

# How to pass manually:
# declare -a files=(
#     "/volume1/media/movies/Batman v Superman Dawn of Justice (2016)/Batman.v.Superman.Dawn.of.Justice.mkv"
# )

staging_dir=/tmp
output_dir=/tmp

for raw_filename in "${files[@]}"; do
    FILE=$(sed -e 's/volume1\/media/\mnt\/gringotts-media/' <<<"${raw_filename}")
    if [ -f "$FILE" ]; then
        input=$(basename -- "$FILE")
        input_no_ending="${input%.*}"
        staging_full="${staging_dir}/${input}"
        output_file="${input_no_ending} - 1080p.mp4"
        output_full_file="${output_dir}/${output_file}"
        if [ $dryrun -ne 0 ]; then
            echo "rsync --progress '${FILE}' '${staging_full}'"
        else
            slack_alert "Copying ${FILE} to ${staging_full}"
            rsync --progress "${FILE}" "${staging_full}"
        fi

        if [ $dryrun -ne 0 ]; then
            echo "Convert ${staging_full} to ${output_full_file} using ${handbrake_preset}"
        else
            slack_alert "Convert ${staging_full} to ${output_full_file} using ${handbrake_preset}"
            HandBrakeCLI -i "${staging_full}" -o "${output_full_file}" --all-audio --preset "${handbrake_preset}"
        fi

        dest_dir=$(dirname "$FILE")
        if [ $dryrun -ne 0 ]; then
            echo "Copying ${output_full_file} to ${dest_dir}"
            echo "Calling ${plex_refresh_library}"
        else
            slack_alert "Copying ${output_full_file} to ${dest_dir}"
            rsync --progress "${output_full_file}" "${dest_dir}"
            curl "${plex_refresh_library}"
            rm "${staging_full}"
            echo "removed ${staging_full}"
        fi
    else
        echo "$FILE does not exist"
    fi
done

if [ $dryrun -ne 0 ]; then
    echo "Done"
else
    slack_alert "Done"
fi
