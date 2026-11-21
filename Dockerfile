FROM node:24-alpine AS frontend
WORKDIR /frontend
COPY Frontend/package*.json ./
RUN npm ci
COPY Frontend/ ./
RUN npm run build

FROM golang:1.26-alpine AS backend
WORKDIR /backend
COPY Backend/go.mod Backend/go.sum ./
RUN go mod download
COPY Backend/ ./
RUN CGO_ENABLED=0 go build -o /server .

FROM alpine:3.23
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=backend /server ./server
COPY --from=frontend /frontend/dist ./Frontend/dist
CMD ["./server"]