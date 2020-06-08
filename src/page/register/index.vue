<template>
    <div>
            <van-nav-bar title="注册用户"
                         left-text="返回"
                         left-arrow fixed="true"
                         @click-left="onClickLeft"
                         class="bottom_margin">
            </van-nav-bar>
            <div class="nav--placeholder" style="width:100%;height:46px"></div>

        <section class="page">
            <div class="text_class">
                hi!欢迎来到零食商贩的世界!<br>
                首次加入请输入相应的信息完成注册。
            </div>
            <div class="register-page">

                <div class="register-wrap">
                    <div class="register-text">
                        用户名：
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="username" type="text" class="register-username" placeholder="请输入用户名" />
                        <i class="iconfont icon-close" data-close="username" v-show="!usernameClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        密码：
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="password" type="password" class="register-password" placeholder="请输入密码"  />
                        <i class="iconfont icon-close" data-close="password" v-show="!passwordClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        邮箱：
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="email" type="text" class="register-email" placeholder="请输入邮箱"  />
                        <i class="iconfont icon-close" data-close="email" v-show="!emailClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        手机号码：
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="phone" type="text" class="register-phone" placeholder="请输入手机号"  />
                        <i class="iconfont icon-close" data-close="phone" v-show="!phoneClose" @click="clearText"></i>
                    </div>
                </div>
            </div>
            <div class="register-error">{{errMsg}}</div>
            <button class="register-button"
                    @click="registerNext"
                    :class="{'active' : removeSpace(username)&&removeSpace(password)&&removeSpace(email)&&removeSpace(phone)}">下 一 步
            </button>
            <transition name="slide">
                <div class="set-security" v-show="securityShow">
                    <div class="set-security-head">
                        <i class="iconfont icon-left" @click="closeSecurity"></i>
                        <span>设置密保问题</span>
                    </div>
                    <p>设置的密保问题和答案<br>将用于忘记密码时重置密码!</p>
                    <div class="register-page">
                        <div class="register-wrap">
                            <div class="register-text">
                                问题：
                                <input @mouseenter="focusText"
                                       @mouseleave="blurText" v-model="question" type="text" class="register-question" placeholder="请输入密保问题" />
                                <i class="iconfont icon-close" data-close="question" v-show="!questionClose" @click="clearText"></i>
                            </div>
                            <div class="register-text">
                                答案：
                                <input @mouseenter="focusText"
                                       @mouseleave="blurText" v-model="answer" type="password" class="register-answer" placeholder="请输入密保答案"  />
                                <i class="iconfont icon-close" data-close="answer" v-show="!answerClose" @click="clearText"></i>
                            </div>
                        </div>
                    </div>
                    <div class="register-error">{{errMsg}}</div>
                    <button class="register-button next" @click="registerSubmit"
                            :class="{'active' : removeSpace(question)&&removeSpace(answer)}">立 即 注 册</button>
                </div>
            </transition>
        </section>
    </div>
</template>

<script>

    import {removeSpace,formValidate} from "./modules/util";
    // import {userRegister} from "../../service/getData";

    export default {
        data() {
            return {
                username: '',
                password: '',
                email: '',
                phone: '',
                question: '',
                answer: '',
                errMsg: '',
                usernameClose: true,
                passwordClose: true,
                emailClose: true,
                phoneClose: true,
                questionClose: true,
                answerClose: true,
                securityShow: false
            }
        },
        methods: {
            onClickLeft(){
                window.history.back();
            },
            focusText(e){
                this.judgeText(e,false)
            },
            blurText(e){
                this.judgeText(e,true)
            },
            judgeText(event,boolean){
                let $className = event.currentTarget.className;
                switch($className){
                    case 'register-username':
                        this.usernameClose = boolean;
                        break;
                    case 'register-password':
                        this.passwordClose = boolean;
                        break;
                    case 'register-email':
                        this.emailClose = boolean;
                        break;
                    case 'register-phone':
                        this.phoneClose = boolean;
                        break;
                    case 'register-question':
                        this.questionClose = boolean
                        break
                    case 'register-answer':
                        this.answerClose = boolean;
                        break;
                }
            },
            clearText(e){
                let $close = e.currentTarget.getAttribute('data-close');
                console.log($close);
                this[$close] = ''
            },
            //下一步
            registerNext(){
                if(!formValidate(this.username,'require') || !formValidate(this.password,'require')
                    || !formValidate(this.email,'require') || !formValidate(this.phone,'require')){
                    this.errMsg = '请将表格填写完整';
                    return
                }
                if(!formValidate(this.email,'email')){
                    this.errMsg = '邮箱格式不正确';
                    return
                }
                if(!formValidate(this.phone,'phone')){
                    this.errMsg = '手机号格式不正确';
                    return
                }
                this.errMsg = '';
                this.securityShow = true;
            },
            //注册
            registerSubmit(){
                if(!formValidate(this.question,'require') || !formValidate(this.answer,'require')){
                    this.errMsg = '请填写密保问题和答案';
                    return;
                }
                // let params = {
                //     username: this.username,
                //     password: this.password,
                //     email: this.email,
                //     phone: this.phone,
                //     question: this.question,
                //     answer: this.answer
                // }
                // userRegister(params).then(()=>{
                //     alert('注册成功')
                //     this.$router.push('./login')
                // })
            },
            closeSecurity(){
                this.securityShow = false
            },
            removeSpace(value){
                return removeSpace(value)
            }
        },
        components: {
            // mHeader
        }
    }
</script>

<style lang="less" type="text/scss" scoped>

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .text_class{
        /*<!--margin-top: -40px;-->*/
        padding:1em;
        border:1em solid transparent;

        background:
                linear-gradient(white,white),
                repeating-linear-gradient(-45deg, #ff6936 0, #ff6936 12.5%, transparent 0, transparent 25%,#58a 0,#58a 37.5%,transparent 0,transparent 50%);
        background-clip: padding-box,border-box;
        background-size: 8em 8em;
        /*<!--background: linear-gradient(white,white) padding-box,repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0/5em 5em;-->*/
    }

    .register-page{
        .register-wrap{
            width: 100%;
            .register-text{
                display: flex;
                width: 90%;
                height: 60px;
                line-height: 60px;
                padding: 20px 10px;
                /*padding-left: 5px;*/
                border-bottom: 1px solid #dcdcdc;
                .iconfont{
                    font-size: 20px;
                    color: #CCCCCC;
                    &.eye{
                        padding: 0 30px;
                        font-size: 20px;
                        border-right: 1px solid #dcdcdc;
                    }
                }
                input{
                    margin-right: 20px;
                    line-height: 45px;
                    color: #222;
                }
                span{
                    padding-left: 20px;
                    font-size: 30px;
                }
                div{
                    display: flex;
                }
            }
        }
    }
    .register-error{
        width: 100%;
        height: 20px;
        line-height: 20px;
        padding: 10px 0;
        color: red;
        font-size: 18px;
    }
    .register-button{
        width: 70%;
        height: 45px;
        text-align: center;
        color: #fff;
        font-size: 25px;
        background: rgba(97, 173, 252,.5);
        margin-bottom: 20px;
        &.active{
            background: rgb(97, 173, 252)
        }
    }

    .set-security{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: #fff;
        p{
            color: #999;
            /*padding-top: 20px;*/
            text-align: center;
            padding:1em;
            border:1em solid transparent;

            background:
                    linear-gradient(white,white),
                    repeating-linear-gradient(-45deg, #ff6936 0, #ff6936 12.5%, transparent 0, transparent 25%,#58a 0,#58a 37.5%,transparent 0,transparent 50%);
            background-clip: padding-box,border-box;
            background-size: 8em 8em;
        }
        .set-security-head{
            position: relative;
            background: rgb(176, 214, 253)   !important;
            border-radius: 6px 6px 6px 6px !important;
            box-shadow: 0 0 0 1px #5F5A4B, 1px 1px 6px 1px rgba(10, 10, 0, 0.3);
            color: #FFFFFF;
            font-weight: bold;
            margin: 15px 0 10px 10px;
            padding: 5px 0 5px 20px;
            text-shadow: 2px 2px 3px #222222;
            width: 80%;
            text-align: left;
            line-height: 40px;
            font-size: 25px;
            .iconfont {
                position: absolute;
                left: 0;
                top: 0;
                font-size: 40px;
                font-weight: bold;
            }
        }
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.5s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>
