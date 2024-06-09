# Uporabi uradno Node.js osnovno sliko z dolgotrajno podporo (LTS)
FROM node:14

# Določi delovni direktorij v Docker kontejnerju
WORKDIR /app

# Kopiraj package.json in package-lock.json (če obstaja) v delovni direktorij
COPY package*.json ./

# Namesti odvisnosti
RUN npm install

# Kopiraj ostalo kodo aplikacije v delovni direktorij
COPY . .

# Odprem vrata, na katerih aplikacija posluša
EXPOSE 3000
EXPOSE 3003

# Določi ukaz za zaganjanje aplikacije
CMD ["node", "app.js"]
