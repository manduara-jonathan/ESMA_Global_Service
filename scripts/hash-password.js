// Script to calculate correct password hash
// Run with: node scripts/hash-password.js

async function hashPassword(password, salt) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function main() {
  const password = "M@nage01++"
  const salt = "mk-global-salt-2024"
  const hash = await hashPassword(password, salt)
  console.log("Password:", password)
  console.log("Salt:", salt)
  console.log("Hash:", hash)
}

main()
