import argparse

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('arg') # argument

  args = parser.parse_args()

  # SQL 쿼리 생성
  print(f'SELECT * FROM tb_user_key WHERE user_id={args.arg}')

if __name__ == '__main__':
    main()