
  server {
    listen 80;
    server_name example.com;

    location / {
      alias {{ base_dir }}example-site/;
    }
  }
