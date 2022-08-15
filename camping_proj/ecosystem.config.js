module.exports = {
  apps: [{
    name: "app",
    script: "./app.js", // 앱 실행 스크립트
    instances: 0, // 클러스터 모드 사용 시 생성할 인스턴스 수
    exec_mode: 'cluster', // fork, cluster 모드 중 선택
    env: {  // 환경변수, 모든 배포 환경에서 공통으로 사용
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],

  deploy: {
    
  }
}