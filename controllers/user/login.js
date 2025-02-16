const jwt = require("jsonwebtoken");
const { user } = require("../../models");

// password 암호화 진행
const crypto = require("crypto");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {
    const { userId, password } = req.body;
    // password 암호화 진행
    const encrypted = crypto
      .createHmac("sha256", secret.secret_pw)
      .update(password)
      .digest("base64");

    let idSearch = await user.findOne({
      where: {
        userId: userId,
      },
    });

    // user 테이블에서 id 찾았을 때 없으면 "id does not exist"
    if (idSearch) {
      let pwSearch = await user.findOne({
        where: {
          userId: userId,
          password: encrypted,
        },
      });
      // user 테이블에서 id는 맞는데 password가 틀렸을 때는 "wrong password"
      if (pwSearch) {
        const accessToken = jwt.sign(
          {
            userId: userId,
          },
          secret.secret_jwt,
          { expiresIn: "7d" }
        );
        res.cookie("accessToken", accessToken, /*{ secure: true }*/);
        res
          .status(200)
          .json({ accessToken: accessToken, massage: "login success" });
        // 로그인 이후 리다이렉션 어떻게 진행할지 논의 필요
      } else {
        res.status(200).send("wrong password");
      }
    } else {
      res.status(200).send("id does not exist");
    }
  },
};
