#!/bin/bash

set -e

export OPTION="help" state="true" asarf="https://github.com/GooseMod/OpenAsar/releases/download/nightly/app.asar" standalonerel="https://github.com/acord-standalone/standalone/archive/refs/heads/main.zip"

# Discord Standart
export standart=(
    "/opt/discord/resources"
    "/usr/lib/discord/resources"
    "/usr/lib64/discord/resources"
    "/usr/share/discord/resources"
    "/var/lib/flatpak/app/com.discordapp.Discord/current/active/files/discord/resources"
    "${HOME}/.local/share/flatpak/app/com.discordapp.Discord/current/active/files/discord/resources"
)

# Discord PTB
export ptb=(
    "/opt/discord-ptb/resources"
    "/usr/lib/discord-ptb/resources"
    "/usr/lib64/discord-ptb/resources"
    "/usr/share/discord-ptb/resources"
    "/var/lib/flatpak/app/com.discordapp.DiscordPtb/current/active/files/discord-ptb/resources"
    "${HOME}/.local/share/flatpak/app/com.discordapp.DiscordPtb/current/active/files/discordPtb/resources"
)

# Discord Canary
export canary=(
    "/opt/discord-canary/resources"
    "/usr/lib/discord-canary/resources"
    "/usr/lib64/discord-canary/resources"
    "/usr/share/discord-canary/resources"
    "/var/lib/flatpak/app/com.discordapp.DiscordCanary/current/active/files/discord-canary/resources"
    "${HOME}/.local/share/flatpak/app/com.discordapp.DiscordCanary/current/active/files/discordCanary/resources"
)

# Define Functions
helper:install() {
    local method=""
    for method in "${@}" ; do
        case "${method,,}" in
            "standart")
                :
            ;;
            "ptb")
                :
            ;;
            "canary")
                :
            ;;
            *)
                echo "${FUNCNAME##*:}: there is no method like \"${method,,}\"."
            ;;
        esac
    done
}

helper:uninstall() {
    :
}


# Pre Check
for _cmd_ in "npm" "wget" "zip" "unzip" "sudo" "mkdir" "mv" "tempfile" ; do
    if ! command -v "${_cmd_}" &> /dev/null ; then
        echo "${0##*/}: Required command not found! Please install the \"${_cmd_}\"."
        export state="false"
    fi
done

if ! "${state}" ; then 
    exit 1
fi

# Select The Option
while [[ "${#}" -gt 0 ]] ; do
    case "${1}" in
        "--install"|"-i")
            export OPTION="install"
            shift
        ;;
        "--uninstall"|"-u")
            export OPTION="uninstall"
            shift
        ;;
        "--shell"|"-s")
            export OPTION="shell"
            shift
        ;;
        "--help"|"-h")
            export OPTION="help"
            shift
        ;;
        *)
            export OPTARG+=("${1}")
            shift
        ;;
    esac
done

if [[ -z "${OPTARG[@]}" ]] ; then
    export OPTARG=("standart")
fi

case "${OPTION}" in
    "install")
        helper:install "${OPTARG[@]}"
    ;;
    "uninstall")
        helper:install "${OPTARG[@]}"
    ;;
    "shell")
        read -p "Helo:> " input
        case "${input}" in
            *)
                :
            ;;
        esac
    ;;
    "help")
        echo "nil"
    ;;
    *)
        echo "${0##*/}: There is no option like \"${OPTION}\"."
        exit 1
    ;;
esac