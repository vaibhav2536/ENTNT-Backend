const generate_redis_key_names = {
  google_access_tokens: (userUUID: string) =>
    `google_access_tokens_${userUUID}`,
  google_refresh_tokens: (userUUID: string) =>
    `google_refresh_tokens_${userUUID}`,
};

export default generate_redis_key_names;
