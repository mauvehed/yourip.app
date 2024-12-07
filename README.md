<h1 align="center">
  <a href="https://github.com/mauvehed/yourIP.app">
    <img src="docs/images/yourIP_logo.png" alt="yourIP Logo" width="100" height="100">
  </a>
</h1>

<div align="center">
  <a href="https://github.com/mauvehed/yourIP.app/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  -
  <a href="https://github.com/mauvehed/yourIP.app/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  -
  <a href="https://github.com/mauvehed/yourIP.app/issues/new?assignees=&labels=enhancement&template=03_CODEBASE_IMPROVEMENT.md&title=dev%3A+">Suggest Improvement</a>
  -

</div>

<div align="center">
<br />

[![CodeQL](https://github.com/mauvehed/yourIP.app/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/mauvehed/yourIP.app/actions/workflows/codeql-analysis.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4ec1fc69d8a14048a80124167f6f7664)](https://www.codacy.com/gh/mauvehed/yourIP.app/dashboard)

[![Project license](https://img.shields.io/github/license/mauvehed/yourip.app.svg?style=flat-square)](LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2FyourIP.app)](https://yourip.app)

</div>

## About

**yourIP** started as a simple web app to fulfill a common need I have of identifying my public IP without having to use other methods to relay it back to me. This is half a purposeful tool and the other half a nice excuse to learn some new things and deployment technologies.

This repository is a continuation of and extension to my existing [yourip](https://github.com/mauvehed/yourip) repository which was written in python and flask. I seek to eventually meet feature parity as I rewrite the application in javascript and vue in this repository.

## Usage

### Development

Please see [Developers](docs/DEVELOPERS.md) for how to setup a dev environment

### Using the website

The current deployment of this tool is hosted and available to all online. You will have a couple choices for how you access
the website and what format your ask for the IP address to be returned in.

1. Point your browser to the official app URL at [https://yourip.app](https://yourip.app)
2. Use your favorite command line web tool (e.g. curl, wget) to access one of the two endpoints (raw or json)

   ```sh
   $ curl -L yourip.app/json
   {
     "ip": "123.45.6.78"
   }
   ```

   ```sh
   $ curl -L yourIP.app/raw
   123.45.6.78
   ```

## Acknowledgements

> Long desired to build, but for sure inspired by Zate's [https://urip.fyi](https://urip.fyi) web [project](https://github.com/Zate/urip.fyi) in Go

## Stats

![Alt](https://repobeats.axiom.co/api/embed/51a6836661e51cd2af55de642d907d4b57abef75.svg "Repobeats analytics image")
