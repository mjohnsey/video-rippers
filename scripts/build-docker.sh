#! /bin/bash

BASEDIR=$(dirname "$0")
dist_folder="${BASEDIR}/../dist"

current_version="0.0.1"

npx oclif-dev pack

current_version_dir="${dist_folder}/video-rippers-v${current_version}"
current_version_tar="${current_version_dir}/video-rippers-v${current_version}.tar.gz"

echo ${current_version_tar}
