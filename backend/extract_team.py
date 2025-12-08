import re

html_file = r'c:\Users\munee\MuneerBackup\Muneer\MainFolder\CodingPractices\Freelance\Surjit Hockey\.source.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all team member entries
pattern = r'<h4 class="media-heading"[^>]*>([^<]+)</h4>\s*<p>([^<]*)</p>\s*</div>\s*<div class="col-sm-4">\s*<img[^>]+src="/public/views/surjit-1/images/secretaries/([^"]+)"'

matches = re.findall(pattern, content, re.DOTALL)

print(f'Found {len(matches)} team members\n')

# Generate SQL INSERT statements
sql_values = []
for i, (name, role, img) in enumerate(matches, 1):
    # Clean up name and role (remove extra whitespace and newlines)
    name = ' '.join(name.split())
    role = ' '.join(role.split()) if role.strip(
    ) and role.strip() != ',' else ''

    # Escape single quotes
    name = name.replace("'", "''")
    role = role.replace("'", "''")

    sql_values.append(
        f"    ('{name}', '{role}', '/images/dedicated-team/{img}', {i})")

print(',\n'.join(sql_values))
