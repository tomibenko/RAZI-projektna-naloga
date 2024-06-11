# Uporabi uradno Node.js osnovno sliko
FROM node:22.1.0

# Določi delovni direktorij v Docker kontejnerju
WORKDIR /app

# Kopiraj package.json in package-lock.json (če obstaja)
COPY backend/package*.json ./

# Namesti odvisnosti
RUN npm install

# Kopiraj ostalo kodo aplikacije v delovni direktorij
COPY backend .

# Odprem vrata, na katerih aplikacija posluša
EXPOSE 3001
EXPOSE 3003

# Določi ukaz za zaganjanje aplikacije
CMD ["node", "app.js"]
