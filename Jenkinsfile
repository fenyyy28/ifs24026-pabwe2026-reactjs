pipeline {

    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
        skipStagesAfterUnstable()
    }

    stages {

        // ============================================================
        // CHECKOUT
        // ============================================================
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

        // ============================================================
        // INSTALL DEPENDENCIES
        // ============================================================
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

        // ============================================================
        // TEST
        // ============================================================
        stage('Test') {
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
                    echo "       RUNNING TESTS WITH COVERAGE"
                    echo "======================================"

                    echo "=== Node Version ==="
                    node --version

                    echo "=== NPM Version ==="
                    npm --version

                    echo "=== Checking Vitest ==="
                    node_modules/.bin/vitest --version

                    echo "=== Checking Coverage Dependency ==="

                    if [ ! -d "node_modules/@vitest/coverage-v8" ]; then
                        echo "ERROR: @vitest/coverage-v8 tidak ditemukan!"
                        exit 1
                    fi

                    echo "=== Coverage Dependency Found ==="

                    echo "=== Running Vitest with Node.js ==="

                    node_modules/.bin/vitest run --coverage

                    echo "=== Tests Passed ==="

                    echo "=== Coverage Directory ==="

                    if [ -d "coverage" ]; then
                        ls -lah coverage
                    else
                        echo "WARNING: coverage directory tidak ditemukan."
                    fi
                '''
            }
        }

        // ============================================================
        // TRIVY SECURITY SCAN
        // ============================================================
        stage('Trivy Security Scan') {
            agent {
                docker {
                    image 'aquasec/trivy:0.74.0'
                    reuseNode true

                    args '''
                        --entrypoint=""
                        -e HOME=/tmp
                        -e XDG_CACHE_HOME=/tmp/.cache
                    '''
                }
            }

            steps {
                sh '''
                    set -e

                    mkdir -p .trivy-cache || true

                    echo "======================================"
                    echo "        TRIVY SECURITY SCAN"
                    echo "======================================"

                    echo "=== Trivy Version ==="
                    trivy --version

                    echo "=== Trivy Scan ==="

                    trivy fs \
                        --cache-dir .trivy-cache \
                        --scanners vuln \
                        --severity HIGH,CRITICAL \
                        --format sarif \
                        --output trivy-results.sarif \
                        --exit-code 1 \
                        .

                    echo "=== Trivy Result ==="

                    ls -lh trivy-results.sarif
                '''
            }

            post {
                always {
                    recordIssues(
                        enabledForFailure: true,
                        failOnError: false,
                        tools: [
                            sarif(
                                id: 'trivy',
                                name: 'Trivy Security',
                                pattern: 'trivy-results.sarif'
                            )
                        ]
                    )
                }
            }
        }

        // ============================================================
        // SONARQUBE ANALYSIS
        // ============================================================
        stage('SonarQube Analysis') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:latest'
                    reuseNode true
                    args '--network cicd-network'
                }
            }

            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        set -e

                        echo "======================================"
                        echo "        SONARQUBE ANALYSIS"
                        echo "======================================"

                        sonar-scanner

                        echo "=== SonarQube Analysis Completed ==="
                    '''
                }
            }
        }

        // ============================================================
        // QUALITY GATE
        // ============================================================
        stage('Quality Gate') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        // ============================================================
        // PACKAGE APPLICATION
        // ============================================================
        stage('Package Application') {
            agent {
                docker {
                    image 'node:24-alpine'
                    reuseNode true
                    args '-u root'
                }
            }

            steps {
                sh '''
                    set -e

                    echo "======================================"
                    echo "       CREATING APPLICATION PACKAGE"
                    echo "======================================"

                    apk add --no-cache zip unzip

                    rm -f latest-app.zip

                    zip -r latest-app.zip . \
                        -x "node_modules/*" \
                        -x ".git/*" \
                        -x ".env" \
                        -x ".env.*" \
                        -x "coverage/*" \
                        -x ".trivy-cache/*" \
                        -x "latest-app.zip" \
                        -x "trivy-results.sarif"

                    echo "=== Application Package Created ==="

                    ls -lh latest-app.zip

                    echo "=== Package Content ==="

                    unzip -l latest-app.zip
                '''
            }
        }

        // ============================================================
        // PUBLISH APPLICATION
        // ============================================================
        stage('Publish Application') {

            steps {

                echo "======================================"
                echo "       PUBLISHING APPLICATION"
                echo "======================================"

                // ====================================================
                // 1. ARCHIVE ARTIFACT KE JENKINS
                // ====================================================

                archiveArtifacts(
                    artifacts: 'latest-app.zip',
                    fingerprint: true,
                    allowEmptyArchive: false
                )

                script {

                    // ====================================================
                    // 2. BUAT IDENTITAS APPLICATION
                    // ====================================================

                    def appName = env.JOB_NAME
                        .replaceAll('[^a-zA-Z0-9._-]', '-')
                        .replaceAll('-+', '-')
                        .replaceAll('^-|-$', '')

                    def buildId = env.BUILD_NUMBER

                    echo "Application Name: ${appName}"
                    echo "Build ID: ${buildId}"

                    // ====================================================
                    // 3. COPY KE USER CONTENT
                    // ====================================================

                    sh """
                        set -e

                        echo "======================================"
                        echo "       PUBLISHING USER CONTENT"
                        echo "======================================"

                        docker exec cicd-jenkins \
                            mkdir -p \
                            "/var/jenkins_home/userContent/applications/${appName}/${buildId}"

                        docker cp \
                            latest-app.zip \
                            "cicd-jenkins:/var/jenkins_home/userContent/applications/${appName}/${buildId}/latest-app.zip"

                        echo "=== Published File ==="

                        docker exec cicd-jenkins \
                            ls -lh \
                            "/var/jenkins_home/userContent/applications/${appName}/${buildId}/latest-app.zip"
                    """

                    // ====================================================
                    // 4. BUAT PUBLIC ARTIFACT URL
                    // ====================================================

                    def jenkinsBaseUrl = env.BUILD_URL
                        .substring(0, env.BUILD_URL.indexOf('/job/'))
                        .replace('localhost', 'host.docker.internal')

                    env.ARTIFACT_URL =
                        "${jenkinsBaseUrl}/userContent/applications/${appName}/${buildId}/latest-app.zip"

                    echo "======================================"
                    echo "       APPLICATION PUBLISHED"
                    echo "======================================"

                    echo "Artifact URL:"
                    echo "${env.ARTIFACT_URL}"
                }
            }
        }

        // ============================================================
        // DEPLOY APPLICATION
        // ============================================================
        stage('Deploy Application') {
            agent {
                docker {
                    image 'curlimages/curl:8.15.0'
                    reuseNode true
                    args '--network cicd-network'
                }
            }

            steps {
                script {

                    echo "=========================================="
                    echo "       START APPLICATION DEPLOYMENT"
                    echo "=========================================="

                    echo "Artifact URL:"
                    echo "${env.ARTIFACT_URL}"

                    // ==================================================
                    // 1. REQUEST REDEPLOYMENT
                    // ==================================================

                    echo ""
                    echo "=== Request Redeployment ==="

                    def redeployResponse = sh(
                        script: '''
                            set -e

                            curl -sS --fail-with-body \
                                -X POST "$URL_REDEPLOY" \
                                -H "Content-Type: application/json" \
                                -d "{
                                    \\"token_access\\": \\"$DEPLOY_TOKEN\\",
                                    \\"website_id\\": \\"$WEBSITE_ID\\",
                                    \\"source_url\\": \\"$ARTIFACT_URL\\",
                                    \\"source_type\\": \\"jenkins\\"
                                }"
                        ''',
                        returnStdout: true
                    ).trim()

                    echo "Redeploy Response:"
                    echo redeployResponse

                    // ==================================================
                    // 2. POLLING DEPLOYMENT PROGRESS
                    // ==================================================

                    echo ""
                    echo "=== Waiting For Deployment ==="

                    def maxAttempts = 120
                    def attempt = 0
                    def deploymentStatus = 'IN_PROGRESS'

                    while (deploymentStatus == 'IN_PROGRESS') {

                        attempt++

                        if (attempt > maxAttempts) {
                            error(
                                "Deployment timeout. " +
                                "Status masih IN_PROGRESS setelah " +
                                "${maxAttempts} attempts."
                            )
                        }

                        sleep time: 5, unit: 'SECONDS'

                        echo ""
                        echo "=== Checking Deployment Progress (${attempt}/${maxAttempts}) ==="

                        def progressResponse = sh(
                            script: '''
                                set -e

                                curl -sS --fail-with-body \
                                    -X POST "$URL_PROGRESS" \
                                    -H "Content-Type: application/json" \
                                    -d "{
                                        \\"token_access\\": \\"$DEPLOY_TOKEN\\",
                                        \\"website_id\\": \\"$WEBSITE_ID\\"
                                    }"
                            ''',
                            returnStdout: true
                        ).trim()

                        echo "Progress Response:"
                        echo progressResponse

                        // ==================================================
                        // PARSE JSON
                        // ==================================================

                        def json = readJSON text: progressResponse

                        deploymentStatus = json?.data?.status
                            ?.toString()
                            ?.toUpperCase()

                        if (!deploymentStatus) {
                            error(
                                "Response progress tidak memiliki data.status"
                            )
                        }

                        echo "Deployment Status: ${deploymentStatus}"

                        // ==================================================
                        // SUCCESS
                        // ==================================================

                        if (deploymentStatus == 'SUCCESS') {

                            echo ""
                            echo "=========================================="
                            echo "       DEPLOYMENT SUCCESS"
                            echo "=========================================="

                            break
                        }

                        // ==================================================
                        // FAILED
                        // ==================================================

                        if (
                            deploymentStatus == 'FAILED' ||
                            deploymentStatus == 'FAILURE' ||
                            deploymentStatus == 'ERROR'
                        ) {

                            echo ""
                            echo "=========================================="
                            echo "       DEPLOYMENT FAILED"
                            echo "=========================================="

                            error(
                                "Deployment gagal dengan status: " +
                                deploymentStatus
                            )
                        }

                        // ==================================================
                        // OTHER STATUS
                        // ==================================================

                        echo "Deployment masih berjalan..."
                    }

                    echo ""
                    echo "=========================================="
                    echo "       DEPLOYMENT FINISHED"
                    echo "=========================================="
                }
            }
        }
    }

    // ================================================================
    // POST ACTIONS
    // ================================================================
    post {

        success {
            echo ""
            echo "======================================"
            echo "       CI/CD PIPELINE SUCCESS"
            echo "======================================"

            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Result: ${currentBuild.currentResult}"

            echo "======================================"
            echo "       APPLICATION DEPLOYED"
            echo "======================================"

            echo "Artifact URL:"
            echo "${env.ARTIFACT_URL}"
        }

        failure {
            echo ""
            echo "======================================"
            echo "       CI/CD PIPELINE FAILED"
            echo "======================================"

            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Result: ${currentBuild.currentResult}"

            echo "Periksa stage yang berwarna merah."
        }

        unstable {
            echo ""
            echo "======================================"
            echo "       CI/CD PIPELINE UNSTABLE"
            echo "======================================"

            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Result: ${currentBuild.currentResult}"
        }

        always {
            echo ""
            echo "======================================"
            echo "       PIPELINE FINISHED"
            echo "======================================"

            echo "Build Number: ${env.BUILD_NUMBER}"
            echo "Result: ${currentBuild.currentResult}"

            echo "======================================"
        }
    }
}