pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
        skipStagesAfterUnstable()
    }

    environment {
        APP_NAME = 'ifs24026-pabwe2026-reactjs'
    }

    stages {

        stage('Checkout') {
            agent {
                docker {
                    image 'oven/bun:alpine'
                    reuseNode true
                }
            }
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'oven/bun:alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       INSTALLING DEPENDENCIES"
                    echo "======================================"

                    unset NODE_ENV

                    bun install --frozen-lockfile

                    echo "=== Dependencies Installed ==="
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'oven/bun:alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       RUNNING TESTS WITH COVERAGE"
                    echo "======================================"

                    echo "=== Environment ==="
                    echo "NODE_ENV=${NODE_ENV:-not-set}"

                    echo "=== Installing Dependencies ==="
                    unset NODE_ENV

                    bun install --frozen-lockfile

                    echo "=== Checking Coverage Dependency ==="

                    bun pm ls @vitest/coverage-v8

                    if [ ! -d "node_modules/@vitest/coverage-v8" ]; then
                        echo "ERROR: @vitest/coverage-v8 tidak ditemukan!"
                        exit 1
                    fi

                    echo "=== Coverage Dependency Found ==="

                    echo "=== Running Tests with Coverage ==="

                    bun run vitest run --coverage --pool=threads

                    echo "=== Tests Passed ==="
                '''
            }
        }

        stage('Trivy Security Scan') {
            agent {
                docker {
                    image 'aquasec/trivy:0.74.0'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       TRIVY SECURITY SCAN"
                    echo "======================================"

                    trivy fs \
                        --scanners vuln,secret \
                        --exit-code 0 \
                        --no-progress \
                        .
                '''
            }
        }

        stage('SonarQube Analysis') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:latest'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        set -e

                        echo "======================================"
                        echo "       SONARQUBE ANALYSIS"
                        echo "======================================"

                        sonar-scanner
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Package Application') {
            agent {
                docker {
                    image 'node:24-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       PACKAGING APPLICATION"
                    echo "======================================"

                    rm -f latest-app.zip

                    zip -r latest-app.zip . \
                        -x "node_modules/*" \
                        -x ".git/*" \
                        -x ".env" \
                        -x "coverage/*" \
                        -x ".trivy-cache/*" \
                        -x "latest-app.zip"

                    echo "=== Application Packaged ==="
                    ls -lh latest-app.zip
                '''
            }
        }

        stage('Publish Application') {
            steps {
                script {
                    def buildId = env.BUILD_NUMBER

                    echo "======================================"
                    echo "       PUBLISH APPLICATION"
                    echo "======================================"

                    echo "Build Number: ${buildId}"

                    sh """
                        docker cp latest-app.zip \
                        cicd-jenkins:/var/jenkins_home/userContent/applications/${APP_NAME}/${buildId}/latest-app.zip
                    """

                    env.ARTIFACT_URL =
                        "https://jenkins.delcom.org/userContent/applications/${APP_NAME}/${buildId}/latest-app.zip"

                    echo "Artifact URL: ${env.ARTIFACT_URL}"
                }
            }
        }

        stage('Deploy Application') {
            agent {
                docker {
                    image 'curlimages/curl:8.15.0'
                    reuseNode true
                }
            }
            environment {
                URL_REDEPLOY = credentials('URL_REDEPLOY')
                DEPLOY_TOKEN = credentials('DEPLOY_TOKEN')
                WEBSITE_ID = credentials('WEBSITE_ID')
            }
            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       DEPLOY APPLICATION"
                    echo "======================================"

                    echo "Artifact URL:"
                    echo "${ARTIFACT_URL}"

                    echo "Starting deployment..."

                    RESPONSE=$(curl -s -X POST \
                        "${URL_REDEPLOY}" \
                        -H "Authorization: Bearer ${DEPLOY_TOKEN}" \
                        -H "Content-Type: application/json" \
                        -d "{
                            \\"website_id\\": \\"${WEBSITE_ID}\\",
                            \\"artifact_url\\": \\"${ARTIFACT_URL}\\"
                        }")

                    echo "Deployment response:"
                    echo "${RESPONSE}"

                    echo "=== Deployment Triggered ==="
                '''
            }
        }
    }

    post {
        always {
            echo "======================================"
            echo "       PIPELINE FINISHED"
            echo "======================================"

            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Result: ${currentBuild.result ?: 'SUCCESS'}"

            echo "======================================"

            script {
                if (currentBuild.result == 'SUCCESS') {
                    echo "       CI/CD PIPELINE SUCCESS"
                } else {
                    echo "       CI/CD PIPELINE FAILED"
                    echo "Periksa stage yang berwarna merah."
                }
            }
        }
    }
}