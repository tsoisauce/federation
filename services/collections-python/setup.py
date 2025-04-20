#!/usr/bin/env python

from setuptools import setup

if __name__ == "__main__":
    try:
        setup(
            # This is just a proxy to pyproject.toml for backward compatibility
            # All configuration should be done in pyproject.toml
        )
    except:  # noqa
        print(
            "\n\nAn error occurred during setup. "
            "Please ensure you have the latest version of pip, setuptools, and wheel installed.\n"
            "You can install them with: uv pip install --upgrade pip setuptools wheel\n"
        )
        raise