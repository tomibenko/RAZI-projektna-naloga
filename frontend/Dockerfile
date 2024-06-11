# Uporabi uradno Node.js osnovno sliko
FROM node:22.1.0

# Določi delovni direktorij v Docker kontejnerju
WORKDIR /app

# Kopiraj package.json in package-lock.json (če obstaja)
COPY frontend/package*.json ./

# Namesti odvisnosti
RUN npm install

# Kopiraj ostalo kodo aplikacije v delovni direktorij
COPY frontend .

# Gradnja aplikacije
RUN npm run build

# Odprem vrata za strežnik
EXPOSE 3000
EXPOSE 3003

# Določi ukaz za zaganjanje aplikacije
CMD ["npm", "start"]
