const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const { ulid } = require('ulid')
const { faker } = require('@faker-js/faker')
const fs = require('fs')

require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

async function insertTestUsers() {
    const client = await pool.connect()
    const BATCH_SIZE = 100
    const TOTAL_USERS = 2000
    const PASSWORD = 'pwd123'
    const hashedPassword = await bcrypt.hash(PASSWORD, 10)
    
    try {
        await client.query('BEGIN')
        
        const csvData = [['Nome', 'Email', 'Senha']]
        const users = []
        
        // Gerar dados dos usuários
        for (let i = 0; i < TOTAL_USERS; i++) {
            const firstName = faker.person.firstName()
            const lastName = faker.person.lastName()
            const name = `${firstName} ${lastName}`
            const email = `${faker.person.firstName().toLowerCase()}.${faker.person.lastName().toLowerCase()}.${ulid().toLowerCase().slice(0, 6)}@leo.qa`
            
            users.push({
                id: ulid(),
                name,
                email,
                password: hashedPassword
            })
            
            csvData.push([name, email, PASSWORD])
        }
        
        // Inserir em lotes
        for (let i = 0; i < users.length; i += BATCH_SIZE) {
            const batch = users.slice(i, i + BATCH_SIZE)
            const values = []
            const placeholders = []
            
            batch.forEach((user, index) => {
                const offset = index * 4
                placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`)
                values.push(user.id, user.name, user.email, user.password)
            })
            
            const query = `
                INSERT INTO users (id, name, email, password)
                VALUES ${placeholders.join(', ')}
            `
            
            await client.query(query, values)
            console.log(`Inseridos ${Math.min(i + BATCH_SIZE, TOTAL_USERS)} de ${TOTAL_USERS} usuários`)
        }
        
        await client.query('COMMIT')
        
        // Gerar CSV
        const csvContent = csvData.map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n')
        
        fs.writeFileSync('usuarios_teste.csv', csvContent, 'utf8')
        
        console.log(`${TOTAL_USERS} usuários inseridos com sucesso!`)
        console.log('Arquivo CSV gerado: usuarios_teste.csv')
        
    } catch (err) {
        await client.query('ROLLBACK')
        console.error('Erro ao inserir usuários de teste:', err)
        throw err
    } finally {
        client.release()
    }
}

async function cleanupTestData() {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const query = `
        WITH usuarios_para_deletar AS (
            SELECT id FROM users WHERE email LIKE '%leo.qa'
        ),
        delete_links AS (
        DELETE FROM links
        WHERE user_id IN (SELECT id FROM usuarios_para_deletar)
        )
        DELETE FROM users
        WHERE id IN (SELECT id FROM usuarios_para_deletar)
        `

        await client.query(query)

        await client.query('COMMIT')
        console.log('Usuários e links de teste removidos com sucesso.')
    
    } catch(err) {
        await client.query('ROLLBACK')
        console.error('Erro ao remover dados de teste: ', err)
    
    } finally {
        client.release()
    }
}

module.exports = { insertTestUsers, cleanupTestData }