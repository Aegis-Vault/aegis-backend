const hre = require("hardhat");

async function main() {
    const SecurityAudit = await hre.ethers.getContractFactory("SecurityAudit"); // Ensure contract 
name matches
    const securityAudit = await SecurityAudit.deploy();

    await securityAudit.deployed();
    console.log(`✅ Contract deployed to: ${securityAudit.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
