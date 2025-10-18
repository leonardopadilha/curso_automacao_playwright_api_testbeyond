export function generateULID() {
    const encode = (time, rand) => {
      const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
      let str = '';
      for (let i = 9; i >= 0; i--) {
        str = alphabet[time % 32] + str;
        time = Math.floor(time / 32);
      }
      for (let i = 0; i < 16; i++) {
        str += alphabet[Math.floor(Math.random() * 32)];
      }
      return str;
    };

    const time = Date.now();
    return encode(time, Math.random());
}
  