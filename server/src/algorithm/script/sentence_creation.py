import argparse
import json
import sys

# 인코딩 문제 해결
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('arg')  # argument
  args = parser.parse_args()

  # 전달받은 JSON 데이터를 파싱
  user_data = json.loads(args.arg)
  ss_list = []
  # SQL 쿼리 생성
  for _ in range(50) :
    print(f"검색한 user의 index : {user_data['user_id']} | 이메일 : {user_data['uk_email']} | 패스워드 : {user_data['uk_password']}")

if __name__ == '__main__':
    main()
