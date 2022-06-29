#git pull
npm run build:prod
docker rmi frontend_pims_user_portal
docker build -t frontend_pims_user_portal -f Dockerfile.prod .
docker save -o  frontend_pims_user_portal.tar frontend_pims_user_portal
#scp -P 5665 frontend-cmt-tunnel-safety-risk-platform.tar  root@119.3.204.120:/root/risk-app/
#Stevejobs_