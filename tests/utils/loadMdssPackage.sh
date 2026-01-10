#!/bin/bash

# Hàm in thông báo lỗi và thoát
error_exit() {
    echo "Lỗi: $1" >&2
    exit 1
}

# 1. Kiểm tra xem lệnh 'mdss' có tồn tại không
if ! command -v mdss &> /dev/null
then
    error_exit "Mdss is not installed. Please install mdss before running this script. - sudo yum install -y ./mdss.rpm "
fi

# 2. Tìm thư mục offline duy nhất
offline_dir=$(find . -maxdepth 1 -type d -name "offline*")
if [ -z "$offline_dir" ] || [ $(echo "$offline_dir" | wc -l) -ne 1 ]; then
    error_exit "No unique directory starting with 'offline' found."
fi

# 3. Kiểm tra file mdss.tar có tồn tại không
if [ ! -f "$offline_dir/mdss.tar" ]; then 
    error_exit "mdss.tar file not found in directory '$offline_dir'."
fi 


echo " Loading mdss docker image from $offline_dir/mdss.tar ..."
sudo docker load -i "$offline_dir/mdss.tar"

echo " Starting mdss service ..."
sudo mdss -c start 

echo "mdss installation and startup completed."
