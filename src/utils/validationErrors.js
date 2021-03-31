export default (details) => ({
  statusCode: 400,
  error: 'Bad Request',
  message: 'Invalid query parameters',
  data: {
    code: 10003,
    validation: {
      details,
    },
  },
});
