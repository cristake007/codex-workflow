$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceAgentsFile = Join-Path $repoRoot 'global\AGENTS.md'
$sourceSkillsDir = Join-Path $repoRoot 'skills'

$codexDir = Join-Path $HOME '.codex'
$userAgentsDir = Join-Path $HOME '.agents'
$targetAgentsFile = Join-Path $codexDir 'AGENTS.md'
$targetSkillsDir = Join-Path $userAgentsDir 'skills'

New-Item -ItemType Directory -Force -Path $codexDir | Out-Null
New-Item -ItemType Directory -Force -Path $userAgentsDir | Out-Null

if (Test-Path $targetAgentsFile) {
    throw "Refusing to replace existing file: $targetAgentsFile"
}

if (Test-Path $targetSkillsDir) {
    throw "Refusing to replace existing path: $targetSkillsDir"
}

try {
    New-Item -ItemType HardLink -Path $targetAgentsFile -Target $sourceAgentsFile | Out-Null
} catch {
    throw "Could not create the AGENTS.md hard link. Clone this repository on the same drive as your Windows user profile, then run the installer again. Original error: $($_.Exception.Message)"
}

try {
    New-Item -ItemType Junction -Path $targetSkillsDir -Target $sourceSkillsDir | Out-Null
} catch {
    Remove-Item -Force $targetAgentsFile -ErrorAction SilentlyContinue
    throw "Could not create the skills junction. Original error: $($_.Exception.Message)"
}

Write-Host 'Codex workflow installed successfully.'
Write-Host "Global instructions: $targetAgentsFile"
Write-Host "Personal skills:     $targetSkillsDir"
Write-Host 'Future repository updates require only: git pull'
