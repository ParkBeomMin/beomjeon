#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// __dirname 대체 (ES 모듈에서는 __dirname이 정의되지 않음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 명령줄 인수 처리
const args = process.argv.slice(2);
const versionType = args[0] || 'patch';
const packageName = args[1] || 'utils';

// 유틸리티 패키지 경로
const UTILS_PATH = path.resolve(__dirname, `../packages/${packageName}`);

/**
 * 명령어 실행 함수
 * @param {string} command 실행할 명령어
 * @param {object} options 옵션
 */
const runCommand = (command, options = {}) => {
  console.log(`실행: ${command}`);
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd: options.cwd || process.cwd() 
    });
    return true;
  } catch (error) {
    console.error(`명령어 실행 중 오류 발생: ${command}`);
    if (options.ignoreError) {
      console.log('오류를 무시하고 계속 진행합니다...');
      return false;
    }
    throw error;
  }
};

/**
 * 패키지 배포 함수
 * @param {string} versionType 버전 타입 (patch, minor, major)
 */
const deployPackage = (versionType = 'patch') => {
  try {
    // 패키지 경로로 이동
    process.chdir(UTILS_PATH);
    console.log(`작업 디렉토리: ${process.cwd()}`);
    
    // 패키지 존재 여부 확인
    if (!fs.existsSync(path.join(UTILS_PATH, 'package.json'))) {
      throw new Error('package.json 파일을 찾을 수 없습니다. 올바른 경로인지 확인하세요.');
    }
    
    // 1. 버전 업데이트 (오류 무시)
    console.log(`\n1. 버전 업데이트 (${versionType})...`);
    runCommand(`pnpm version ${versionType}`, { cwd: UTILS_PATH, ignoreError: true });
    
    // 2. Git에 변경사항 추가
    console.log('\n2. Git에 변경사항 추가...');
    runCommand('git add package.json', { cwd: UTILS_PATH });
    
    // 3. 커밋 생성
    console.log('\n3. 커밋 생성...');
    runCommand(`git commit -m "🔖 bump: ${versionType} release"`, { cwd: UTILS_PATH });
    
    // 4. 패키지 배포
    console.log('\n4. 패키지 배포...');
    runCommand('pnpm release', { cwd: UTILS_PATH });
    
    console.log('\n✅ 배포가 성공적으로 완료되었습니다!');
  } catch (error) {
    console.error('\n❌ 배포 중 오류가 발생했습니다:', error.message);
    process.exit(1);
  }
};


// 유효한 버전 타입 확인
const validVersionTypes = ['patch', 'minor', 'major'];
if (!validVersionTypes.includes(versionType)) {
  console.error(`❌ 유효하지 않은 버전 타입입니다: ${versionType}`);
  console.log(`유효한 버전 타입: ${validVersionTypes.join(', ')}`);
  process.exit(1);
}

// 배포 실행
deployPackage(versionType); 