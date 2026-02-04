pipeline {
    agent any

    stages {

        stage('Clone & Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t day2-node-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f nodeapp || true'
                sh 'docker run -d -p 3000:3000 --name nodeapp day2-node-app'
            }
        }
    }
}
