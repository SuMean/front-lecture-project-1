import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
// import { getUserFeeds } from '../../api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import css from './EditMember.module.scss';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// import { getMyProfile } from '../../api';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
// import LoginOnlyPage from '../../components/LoginOnlyPage';
import {
  getMyProfile,
  userNameLogin,
  changeProfileUser,
  instance,
} from '../../api';
import ModalBasic from '../../components/Modal/ModalBasic';
import { useMutation } from '@tanstack/react-query';
const EditMember = () => {
  // useEffect(() => {}, [data.name]);
  // LoginOnlyPage();

  // if (isError) {
  //   navigate('/notfound');
  // }
  const [click, setClick] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { isLoading, data, isError } = useQuery(['myprofile'], getMyProfile, {
    retry: false,
  });
  if (isError) {
    console.log('hello');
    navigate('/notfound');
  }
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(changeProfileUser, {
    onMutate: data => {
      console.log('mutation start...');
      console.log(data);
    },
    onSuccess: () => {
      console.log('API CALL success...');
      setSuccess(true);
    },
    onError: () => {
      console.log('API CALL error...');
    },
  });

  const submitForm = data => {
    mutation.mutate(data);
  };
  const password = useRef();
  password.current = watch('password');

  const checkUsename = id => {
    return instance
      .get(`users/@${id}`)
      .then(res => res.data)
      .then(res => alert(res));
  };
  // console.log('data', data);
  if (data) {
    console.log(data);
    return (
      <>
        <div className={css.Container}>
          <div className={css.Wrapper}>
            <div className={css.TopBox}>
              <h1 className={css.h1}>회원정보수정</h1>
              <form className={css.Form} onSubmit={handleSubmit(submitForm)}>
                <h6 className={css.h6}>모든 값은 필수입력 값입니다.</h6>
                <label className={`${css.topborder} ${css.label}`}>
                  아이디
                </label>
                <div className={css.buttonflex}>
                  <input
                    value={data.username}
                    name="username"
                    placeholder="아이디를 입력해주세용"
                    className={` ${css.Input} ${css.color}`}
                    {...register('username', {
                      required: true,
                      pattern: /^[a-z0-9]{5,20}$/,
                    })}
                  />
                </div>
                <h6 className={css.h6Id}>아이디는 바꿀 수 없습니다</h6>
                <label className={css.label}>비밀번호</label>
                <input
                  placeholder="비밀번호를 입력해주세용"
                  name="password"
                  type="password"
                  autoComplete="off"
                  className={css.Input}
                  {...register('password', {
                    required: true,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                  })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <p className={css.errors}>비밀번호는 필수 입력값입니다.</p>
                )}
                {errors.password && errors.password.type === 'pattern' && (
                  <p className={css.errors}>
                    비밀번호는 8~20자 사이여야 하며 문자,숫자,특수문자를
                    조합해야합니다.
                  </p>
                )}
                <label className={css.label}>비밀번호 확인</label>
                <input
                  name="passwordCheck"
                  placeholder="비밀번호를 한번 더 치세용"
                  type="password"
                  autoComplete="off"
                  className={css.Input}
                  {...register('passwordCheck', {
                    required: true,
                    validate: {
                      check: val => {
                        // console.log(val);
                        console.log(getValues('password'));
                        if (getValues('password') !== val) {
                          return 'error';
                        }
                      },
                    },
                  })}
                />

                {errors.passwordCheck && (
                  <p className={css.errors}>비밀번호가 틀립니다.</p>
                )}
                <label className={css.label}>이름</label>
                <input
                  placeholder="이름을 입력해주세용"
                  name="name"
                  defaultValue={data.name}
                  className={css.Input}
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className={css.errors}>이름은 필수 입력값입니다.</p>
                )}

                <label className={css.label}>생년월일</label>
                <input
                  name="dateBirth"
                  defaultValue={data.dateBirth}
                  type="date"
                  className={css.Input}
                  {...register('dateBirth', { required: true })}
                />
                {errors.dateBirth && (
                  <p className={css.errors}>생년월일은 필수 입력 값입니다.</p>
                )}
                <label className={css.label}>성별</label>
                <div className={css.flexContainer}>
                  <div className={css.genderContainer}>
                    <input
                      checked={data.gender === 'male' ? true : false}
                      name="gender"
                      id="male"
                      type="radio"
                      defaultValue="male"
                      {...register('gender', { required: true })}
                    />
                    <label
                      htmlFor="male"
                      className={
                        data.gender === 'male' ? css.genderlabel : css.none
                      }
                    >
                      남자
                    </label>
                  </div>
                  <div className={css.genderContainer}>
                    <input
                      checked={data.gender === 'female' ? true : false}
                      name="gender"
                      id="female"
                      type="radio"
                      defaultValue="female"
                      className={` ${css.radioMargin}`}
                      {...register('gender', { required: true })}
                    />
                    <label
                      className={
                        data.gender === 'female' ? css.genderlabel : css.none
                      }
                      htmlFor="female"
                    >
                      여자
                    </label>
                  </div>
                </div>
                <h6 className={css.h6Gender}>성별은 바꿀 수 없습니다</h6>
                {errors.gender && (
                  <p className={css.errors}>성별은 필수 입력값입니다.</p>
                )}
                <label className={css.label}>전화번호</label>
                <input
                  placeholder="전화번호를 입력해주세용"
                  defaultValue={data.phoneNumber}
                  name="phoneNumber"
                  type="tel"
                  className={css.Input}
                  {...register('phoneNumber', { required: true })}
                />
                {errors.phoneNumber && (
                  <p className={css.errors}>전화번호는 필수 입력 값입니다.</p>
                )}
                {errors.phoneNumber &&
                  errors.phoneNumber.type === 'pattern' && (
                    <p className={css.p}>숫자만 입력가능합니다.</p>
                  )}
                <label className={css.label}>이메일</label>
                <input
                  defaultValue={data.email}
                  placeholder="이메일를 입력해주세용"
                  name="email"
                  type="text"
                  className={css.Input}
                  {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className={css.errors}>이메일 형식이 아닙니다.</p>
                )}
                <label className={`${css.label} ${css.question}`}>
                  이용약관 문의
                </label>
                <div className={css.flex}>
                  <label className={css.answer} htmlFor="termsOfUse">
                    이용약관에 동의합니다.
                  </label>
                  <input
                    checked={true}
                    name="termsOfUse"
                    id="termsOfUse"
                    type="checkbox"
                    className={`${css.checkbox} ${css.radioMargin}`}
                    {...register('termsOfUse', {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                </div>
                {errors.termsOfUse && (
                  <p className={css.errors}>
                    이용약관에 동의하지 않으면 가입이 불가능합니다.
                  </p>
                )}
                <div className={css.buttonContainer}>
                  <button
                    type="submit"
                    className={css.Button}
                    onClick={() => {
                      setClick(true);
                    }}
                  >
                    회원정보 수정
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {success && click && (
          <ModalBasic
            isOpen={true}
            successContent={'회원 정보 수정되었습니다아아아~~~'}
            onClose={() => {
              setClick(false);
            }}
          />
        )}
      </>
    );
  }
};

export default EditMember;
