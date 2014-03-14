
  server {
    listen       80;
    server_name dev.buttontriggers.guru buttontriggers.guru;
    
    location = /consumer.js {
      root {{ base_dir }}target/;
    }

    location /api {
      rewrite /api(.*) "$1" break;
      proxy_pass http://localhost:8080;
    }

  	location /media/ {
      alias {{ base_dir }}target/media/;
    }
  	
    location / {
      alias {{ base_dir }}target/pages/;
    }
    
  }