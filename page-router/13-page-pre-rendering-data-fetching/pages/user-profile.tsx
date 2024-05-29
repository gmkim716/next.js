// 쿠키를 받아 요청하는 사용자를 식별 

export default function UserProfilePage(props: any) {
  return (
    <h1>{props.username}</h1>
  )
}

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Max'
    }
  }
}