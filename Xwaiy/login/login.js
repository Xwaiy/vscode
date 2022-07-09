var flag = false;
var sec = 60;
function checkMobile() {
    var mobileDom = document.getElementById("mobile");
    var mobile = mobileDom.value;
    var mobileTip = document.getElementById("mobileTip");
    if (!mobile) {
        mobileDom.style.borderColor = "red";
        mobileTip.innerText = "请输入手机号";
        return false;
    }
    var myReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myReg.test(mobile)) {
        mobileDom.style.borderColor = "red";
        mobileTip.innerText = "手机号格式错误";
    } else {
        mobileDom.style.borderColor = "#E0E0E0";
        mobileTip.innerText = "";
        return true;
    }
}

//获取验证码
function getCode() {
    if (flag) {
        return;
    }
    var ifMobile = checkMobile();
    if (!ifMobile) {
        return;
    }
    var codeMsg = document.getElementById("codeMsg");
    codeMsg.innerText = "60s";
    countF();
}

//倒计时
function countF() {
    flag = true;
    sec--;
    var codeMsg = document.getElementById("codeMsg");
    codeMsg.innerText = sec + "s";
    setTimeout(function () {
        if (sec == 0) {
            codeMsg.innerText = "重新获取";
            flag = false;
            sec = 60;
        }
        else {
            countF();
        }
    }, 1000)
}

//检验验证码
function checkCode() {
    var ifMobile = checkMobile();
    if (!ifMobile) {
        return;
    }
    var codeDom = document.getElementById("code");
    var code = codeDom.value;
    var codeTip = document.getElementById("codeTip");
    if (!code) {
        codeDom.style.borderColor = "red";
        codeTip.innerText = "请输入验证码";
    } else {
        codeDom.style.borderColor = "#E0E0E0";
        codeDom.innerText = "";
        var sub = document.getElementById("sub");
        sub.style.background = "#2E58FF";
        return true;
    }
}
//注册
function regF() {
    if (checkMobile() && checkCode()) {
        alert("注册成功!");
    }
}