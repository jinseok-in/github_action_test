const pool = require('../config/database');
const bcrypt = require('bcrypt');

const postCheckEmail = async (req, res) => {
  const checkingEmail = req.body.email;
  console.log(checkingEmail);
  
  let connection;
  try {
    connection = await pool.getConnection();
    const query = 'SELECT user_email FROM tb_user'
    const result = await connection.execute(query);
    console.log('Email쿼리적용 데이터:', result);

    const jsonValue = result.map(item => item.user_email);
    console.log(jsonValue);
    if (jsonValue.includes(checkingEmail)) {
      console.log('이미 가입된 이메일');
      res.status(200).json({ message: 'impossible', id: result.insertId });
    } else {
      console.log('가입 가능한 이메일');
      res.status(200).json({ message: 'possible', id: result.insertId });
    }

  } catch (err) {
      console.error('Email쿼리실행 에러:', err);
      res.status(500).send('서버 에러');
  } finally {
      if (connection) connection.release();  // 연결 반환. 풀로 되돌리기
  }
  
}


const postUserRegister = async (req, res) => {

  const {
    user_email, user_password, user_name, user_birth_date,
    user_sex, user_bank_num, user_capital, user_permission
  } = req.body;  // user_mobile, user_loan, user_installment_saving, user_deposit

  console.log('회원가입 데이터:', req.body);

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(user_password, 10); // 솔트 라운드를 10으로 설정

  let connection;
  try {
    connection = await pool.getConnection();

    const query = 'INSERT INTO tb_user (user_email, user_password, user_name, user_birth_date, user_sex, user_bank_num, user_capital, user_permission) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      // user_permission, user_loan, user_installment_saving, user_deposit, user_mobile,
    const result = await connection.execute(query, [
      user_email,
      hashedPassword, // 해싱된 비밀번호를 저장
      user_name,
      user_birth_date,
      user_sex,
      user_bank_num || null,
      user_capital || null,
      user_permission || 1
    ]);
        // user_loan, user_installment_saving, user_deposit
    console.log('회원가입 적용쿼리:', result);
    // connection.release();  // 연결반환. 풀로 되돌리기

    res.status(200).json({ message: 'User registered successfully!', id: result.insertId.toString() });
  } catch (err) {
      console.error('회원가입 쿼리실행 에러:', err);
      res.status(500).send('서버 에러');
  } finally {
      if (connection) connection.release();  // 연결 반환. 풀로 되돌리기
  }

};

module.exports = {
  postUserRegister,
  postCheckEmail
};
