#!/bin/bash
#
# Content Update Helper Script
# Simplifies the process of updating website content
#

set -e

PROJECT_DIR="$(dirname "$(dirname "$(realpath "$0")")")/web"
DEPLOY_HOST="192.168.1.203"
DEPLOY_PATH="/mnt/docker/ulrich-energy-website"

show_help() {
    cat << EOF
Content Update Helper for Ulrich Energy Auditing Website

Usage: $0 [command] [options]

Commands:
    update-stats          Update the statistics (years, homes, builders)
    update-team           Update team member information
    update-contact        Update contact information
    update-services       Update services content
    verify                Verify content before deployment
    deploy                Build and deploy changes

Options:
    -h, --help           Show this help message
    --dry-run            Preview changes without deploying

Examples:
    $0 update-stats
    $0 update-contact --dry-run
    $0 verify
    $0 deploy

EOF
}

update_stats() {
    echo "📝 Current Statistics:"
    grep -A 5 "const stats = \[" "$PROJECT_DIR/src/app/page.tsx" | head -10
    
    echo ""
    echo "Enter new statistics (press Enter to keep current):"
    
    read -p "Years in business [10+]: " years
    years=${years:-"10+"}
    
    read -p "Homes inspected [2,500+]: " homes
    homes=${homes:-"2,500+"}
    
    read -p "Builder partners [50+]: " builders
    builders=${builders:-"50+"}
    
    # Update the file
    sed -i "s/{ number: \"[^\"]*\", label: \"Years in Business\"/{ number: \"$years\", label: \"Years in Business\"/" "$PROJECT_DIR/src/app/page.tsx"
    sed -i "s/{ number: \"[^\"]*\", label: \"Homes Inspected\"/{ number: \"$homes\", label: \"Homes Inspected\"/" "$PROJECT_DIR/src/app/page.tsx"
    sed -i "s/{ number: \"[^\"]*\", label: \"Builder Partners\"/{ number: \"$builders\", label: \"Builder Partners\"/" "$PROJECT_DIR/src/app/page.tsx"
    
    echo "✅ Statistics updated"
}

update_contact() {
    echo "📝 Current Contact Information:"
    grep -A 2 "Phone\|Email" "$PROJECT_DIR/src/components/footer.tsx" | head -10
    
    echo ""
    echo "Enter new contact information (press Enter to keep current):"
    
    read -p "Phone [(952) 240-4369]: " phone
    phone=${phone:-"(952) 240-4369"}
    
    read -p "Email [Shaun.Ulrich@UlrichEnergyAuditing.com]: " email
    email=${email:-"Shaun.Ulrich@UlrichEnergyAuditing.com"}
    
    # Format phone for tel: link
    phone_link=$(echo "$phone" | sed 's/[^0-9]//g')
    
    # Update files
    files=(
        "$PROJECT_DIR/src/components/footer.tsx"
        "$PROJECT_DIR/src/app/contact/page.tsx"
    )
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            sed -i "s/href=\"tel:[^\"]*\"/href=\"tel:$phone_link\"/g" "$file"
            sed -i "s/[0-9]\{3\}-[0-9]\{3\}-[0-9]\{4\}/$(echo "$phone" | sed 's/[^0-9]//g' | sed 's/^\(...\)\(...\)\(....\)/\1-\2-\3/')/g" "$file"
            sed -i "s/href=\"mailto:[^\"]*\"/href=\"mailto:$email\"/g" "$file"
            sed -i "s/[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*ulrich[^\"]*/$email/g" "$file"
        fi
    done
    
    echo "✅ Contact information updated"
}

verify_content() {
    echo "🔍 Verifying content..."
    
    cd "$PROJECT_DIR"
    
    # Check TypeScript
    echo "Running TypeScript check..."
    npx tsc --noEmit || { echo "❌ TypeScript errors found"; exit 1; }
    
    # Build
    echo "Building..."
    npm run build || { echo "❌ Build failed"; exit 1; }
    
    # Check for broken links
    echo "Checking links..."
    if command -v htmltest &> /dev/null; then
        htmltest dist/ || echo "⚠️  Some link checks failed"
    else
        echo "ℹ️  htmltest not installed, skipping link check"
    fi
    
    echo "✅ Verification complete"
}

deploy() {
    echo "🚀 Deploying..."
    "$(dirname "$0")/deploy.sh"
}

# Main command handler
case "${1:-}" in
    update-stats)
        update_stats
        ;;
    update-contact)
        update_contact
        ;;
    verify)
        verify_content
        ;;
    deploy)
        deploy
        ;;
    --help|-h|help)
        show_help
        ;;
    *)
        echo "Unknown command: ${1:-}"
        show_help
        exit 1
        ;;
esac
