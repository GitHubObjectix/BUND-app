# BUNDApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment to AWS

### Build and publish Docker image
docker build -t objectix/bund-app-image:latest .
docker push objectix/bund-app-image:latest

### Create Elastic Beanstalk app by selecting Dockerun.aws.json

Go to AWS console
Goto Elastic Beanstalk
Select 'Anwendung', 'Erstelle Anwendung'
Select platform 'Docker' and select file 'Dockerun.aws.json'

## Upload key/certificate to AWS IAM via console (use upload to upload certificate.pen and key.pem from BUND-app/ssl)

aws iam upload-server-certificate --server-certificate-name BUND-Hettstadt-Nistkaesten-x509 --certificate-body file://certificate.pem --private-key file://key.pem

## Create load balancer to support HTTPs connections (see https://docs.aws.amazon.com/de_de/elasticbeanstalk/latest/dg/configuring-https-elb.html)

## AWS API Gateway - Create stage 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
