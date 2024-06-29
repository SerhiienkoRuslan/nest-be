'use client';

import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';

import { Box, FormHelperText } from '@mui/material';

import { RequestLoading } from '@/components/Loading';
import { createPost } from '@/lib/Posts/createPost';
import { CreatePostResponseAPI, PostBody } from '@/types/api/posts';
import { createPostValidation } from '@/utils/validation/createPostValidation';

const initialValues = {};

const CreatePost = () => {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string | null>(null);

  const {
    mutate: submitCreatePost,
    isLoading,
    isError: isErrorLogin,
    data: loginData,
    isSuccess: isSuccessLogin,
  } = useMutation((data: PostBody) => createPost(data), {
    onSuccess: (data: CreatePostResponseAPI) => {
      router.push(`/posts/${data.id}`);
    },
    onError: (error: string) => {
      setFormErrors(error.toString());
    },
  });

  const handleSubmit = async (values) => {
    submitCreatePost(values);
  };

  return (
    <>
      {isLoading && <RequestLoading />}

      <Formik
        initialValues={initialValues}
        validationSchema={createPostValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/*TODO: should be notification*/}
            {/*{ Submit error}*/}
            {formErrors && (
              <Box>
                <FormHelperText error>{formErrors}</FormHelperText>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreatePost;
