# Troubleshooting

Common issues and solutions for DClaw Email.

## Quick Diagnostics

```bash
# Check app pods
kubectl get pods -n dclaw-email

# Check logs
kubectl logs -n dclaw-email deployment/dclaw-email-backend

# Check database
kubectl get clusters -n dclaw-email
```

## Sections

- [Common Issues](./common-issues)
- [FAQ](./faq)
