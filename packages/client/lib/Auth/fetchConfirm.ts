import API from '@/lib/api';

const fetchConfirm = (value: string) => {
  return API.post(`/verify/${value}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
