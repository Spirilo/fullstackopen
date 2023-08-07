const ErrorMsg = ({ msg }: { msg: string}) => {
  const errorStyle = {
    color: 'red'
  }


  return <p style={errorStyle}>{msg}</p>
};

export default ErrorMsg;