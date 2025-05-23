Welcome limo-health

This application currently loads data from two json files: 

/src/data/medications.json 

and 

/src/data/appointments.json

# Getting Started

To run this application:

```bash
bun install
bun run start-all
```


## Production
# Build the image
docker build -t limo-health .

# Start a new container
docker run -p 5173:5173 -p 5174:5174 --name limo-health-container limo-health

# If the container exists from previouse usage remove the existing container
docker rm -f limo-health-container


# Building For Production

To build this application for production:

```bash
bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bun run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.



## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpx shadcn@latest add button
```

## Encryption
This project uses [AES-256-CBC](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) for encryption. The encryption key is stored in the `.env` file.
with a keyname ENCRYPTION_KEY



## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.
