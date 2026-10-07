pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
        skipStagesAfterUnstable()
    }

    environment {
        APP_NAME = 'ifs24026-pabwe2026-reactjs'
        URL_REDEPLOY = 'https://delcom-job-api.delcom.org/api/v1/deployments/redeploy'
        URL_PROGRESS = 'https://delcom-job-api.delcom.org/api/v1/deployments'
        WEBSITE_ID = 'ifs24026-pabwe2026-reactjs'
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

                    unset NODE_ENV

                    echo "=== Installing Dependencies ==="
                    bun install --frozen-lockfile

                    echo "=== Checking Vitest ==="
                    bun pm ls vitest

                    echo "=== Checking Coverage Dependency ==="
                    bun pm ls @vitest/coverage-v8

                    if [ ! -d "node_modules/@vitest/coverage-v8" ]; then
                        echo "ERROR: @vitest/coverage-v8 tidak ditemukan!"
                        exit 1
                    fi

                    echo "=== Coverage Dependency Found ==="

                    echo "=== Running Vitest in Single Fork ==="

                    bun run vitest run --coverage \
                        --pool=forks \
                        --poolOptions.forks.singleFork=true

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
                        --exit-code 0 \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        .

                    echo "=== Trivy Scan Completed ==="
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

                        sonar-scanner \
                            -Dsonar.projectKey=${APP_NAME} \
                            -Dsonar.projectName=${APP_NAME} \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=node_modules/**,coverage/**,.git/**

                        echo "=== SonarQube Analysis Completed ==="
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo "======================================"
                echo "          QUALITY GATE"
                echo "======================================"

                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }

                echo "=== Quality Gate Passed ==="
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

                    echo "=== Package Created ==="
                    ls -lh latest-app.zip
                '''
            }
        }

        stage('Publish Application') {
            steps {
                script {
                    def buildId = env.BUILD_NUMBER
                    def appName = env.APP_NAME

                    echo "======================================"
                    echo "       PUBLISH APPLICATION"
                    echo "======================================"

                    echo "Application : ${appName}"
                    echo "Build Number: ${buildId}"

                    sh """
                        set -e

                        docker cp latest-app.zip \
                            cicd-jenkins:/var/jenkins_home/userContent/applications/${appName}/${buildId}/latest-app.zip
                    """

                    env.ARTIFACT_URL =
                        "https://jenkins.delcom.org/userContent/applications/${appName}/${buildId}/latest-app.zip"

                    echo "Artifact URL:"
                    echo "${env.ARTIFACT_URL}"

                    echo "=== Application Published ==="
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

            steps {
                withCredentials([
                    string(
                        credentialsId: 'deploy-token',
                        variable: 'DEPLOY_TOKEN'
                    )
                ]) {
                    sh '''
                        set -e

                        echo "======================================"
                        echo "       DEPLOYING APPLICATION"
                        echo "======================================"

                        echo "Application : ${APP_NAME}"
                        echo "Website ID  : ${WEBSITE_ID}"
                        echo "Artifact    : ${ARTIFACT_URL}"

                        echo "=== Starting Deployment ==="

                        RESPONSE=$(curl -sS -X POST \
                            "${URL_REDEPLOY}" \
                            -H "Authorization: Bearer ${DEPLOY_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d "{
                                \\"website_id\\": \\"${WEBSITE_ID}\\",
                                \\"artifact_url\\": \\"${ARTIFACT_URL}\\"
                            }")

                        echo "Deployment Response:"
                        echo "${RESPONSE}"

                        echo "=== Deployment Request Sent ==="
                    '''
                }
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
        }

        success {
            echo "======================================"
            echo "       CI/CD PIPELINE SUCCESS"
            echo "======================================"

            echo "Semua stage berhasil."
        }

        failure {
            echo "======================================"
            echo "       CI/CD PIPELINE FAILED"
            echo "======================================"

            echo "Periksa stage yang berwarna merah."
        }
    }
}