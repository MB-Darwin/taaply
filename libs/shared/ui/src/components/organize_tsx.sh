#!/bin/bash

# Check if a directory argument was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Get the directory from the argument
SOURCE_DIR="$1"

# Check if the directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Directory '$SOURCE_DIR' does not exist"
    exit 1
fi

# Change to the source directory
cd "$SOURCE_DIR" || exit 1

# Process each subdirectory
for dir in */; do
    # Skip if no directories found
    [ -d "$dir" ] || continue

    # Remove trailing slash from directory name
    dir_name="${dir%/}"

    # Create index.tsx file in the directory
    index_file="${dir}index.ts"

    # Clear the index file if it exists
    > "$index_file"

    # Process all .tsx files in the directory
    file_count=0
    for file in "$dir"*.tsx; do
        # Skip if no .tsx files found
        [ -f "$file" ] || continue

        # Get just the filename without path and extension
        filename=$(basename "$file" .tsx)

        # Skip if the file is index.tsx itself
        if [ "$filename" = "index" ]; then
            continue
        fi

        # Add export statement to index.tsx
        echo "export * from \"./$filename\";" >> "$index_file"
        ((file_count++))
    done

    if [ $file_count -gt 0 ]; then
        echo "Created $index_file with $file_count exports"
    else
        # Remove empty index.tsx file
#        rm -f "$index_file"
        echo "No .tsx files found in $dir_name (skipped)"
    fi
done

# Optionally, create a main index.tsx in the root directory that exports from all subdirectories
echo
echo "Creating main index.ts in root directory..."
main_index="index.ts"
> "$main_index"

for dir in */; do
    [ -d "$dir" ] || continue
    dir_name="${dir%/}"

    # Only add to main index if the directory has an index.tsx file
    if [ -f "${dir}index.ts" ]; then
        echo "export * from \"./$dir_name\";" >> "$main_index"
    fi
done

echo "Created main $main_index"
echo "Export generation complete!"
