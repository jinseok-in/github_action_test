import sys

def main(input_value):
    try:
        result = input_value  # 입력값을 두 배로 (예시)
        print(f"Result: {result}")  # 결과 출력
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(2)  # 오류 코드 2로 종료

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_value = sys.argv[1]  # 명령행 인수로부터 입력값 받기
        main(input_value)
    else:
        print("No input provided", file=sys.stderr)
        sys.exit(1)