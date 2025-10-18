const { cleanupTestData } = require('./playwright/support/database')

module.exports = async () => {
    console.log('Limpando os dados de teste antes da execução...')
    await cleanupTestData()
    console.log('Dados de teste removidos com sucesso.')
}