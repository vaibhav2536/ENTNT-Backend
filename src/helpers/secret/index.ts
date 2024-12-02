import bcrypt from "bcryptjs";

class Secret {
  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async compareData(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }

  async generateRandomString() {
    return Math.random().toString(36).substring(7);
  }
}

export default new Secret();
