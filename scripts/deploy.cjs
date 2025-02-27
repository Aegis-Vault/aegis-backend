const hre = require("hardhat");

async function main() {
    const SecurityAudit = await hre.ethers.getContractFactory("SecurityAudit");
    const securityAudit = await SecurityAudit.deploy();

    await securityAudit.waitForDeployment(); // ✅ Fix for ethers.js v6

    console.log(`✅ Contract deployed to: ${securityAudit.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
