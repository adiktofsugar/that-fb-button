user       www www;  ## Default: nobody
worker_processes  5;  ## Default: 1
error_log  {{ base_dir }}nginx/logs/error.log info;
pid        {{ base_dir }}nginx/nginx.pid;
worker_rlimit_nofile 8192;
 
events {
  worker_connections  4096;  ## Default: 1024
}
 
http {
  include    mime.types;
  index    index.html index.htm;
 
  default_type application/octet-stream;
  log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log   {{ base_dir }}nginx/access.log  main;
  sendfile     on;
  tcp_nopush   on;
  server_names_hash_bucket_size 128; # this seems to be required for some vhosts
 
  {% include "nginx/servers/example" %}
  {% include "nginx/servers/buttontriggers" %}
 
}