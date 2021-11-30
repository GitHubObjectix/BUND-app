# create self-signed certificate
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem

# view certificate
openssl x509 -text -noout -in certificate.pem
