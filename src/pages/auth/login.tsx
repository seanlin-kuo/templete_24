import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [postData, setPostData] = useState({});
  const onCheckbox = () => {
    // v will be true or false
  };
  const login = () => {
    axios
      .post(
        'https://sean-nimda-42.dev.kuobrothers.com/login',
        {
          account: postData.email,
          pass: postData.password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.errCode != '0000') {
          alert('登入失敗');
          return;
        }
        window.location.replace('/extra-components/accordion');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event) => {
    let post = { ...postData };
    post[event.target.name] = event.target.value;
    setPostData(post);
  };
  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <InputGroup fullWidth>
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} />
          </InputGroup>
          <InputGroup fullWidth>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
            <Link href="/auth/request-password">
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="button" onClick={login} shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
