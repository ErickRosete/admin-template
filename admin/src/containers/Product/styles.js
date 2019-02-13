const styles = theme => ({
  textfield: {
    margin: theme.spacing.unit
  },
  imagefield: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imgContainer: {
    marginLeft: '1rem',
    display: 'flex',
    overflowX: 'auto',
  },
  img: {
    margin: theme.spacing.unit
  },
  wrapper: {
    margin: "auto"
  },
  editor: {
    border: "1px solid lightgray",
    minHeight: "40vh"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default styles;
