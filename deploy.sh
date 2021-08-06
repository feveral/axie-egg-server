source .env.production
sudo docker build -t axie-egg:latest .
sudo docker 2>/dev/null stop axie-egg-container | true
sudo docker 2>/dev/null rm axie-egg-container | true
sudo docker run -d -p $SERVER_PORT:$SERVER_PORT --name axie-egg-container axie-egg:latest
sudo docker 2>/dev/null rmi `sudo docker images --filter dangling=true -q` | true