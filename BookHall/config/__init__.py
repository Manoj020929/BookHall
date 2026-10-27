try:
    import MySQLdb  # noqa: F401  (used on your laptop)
except ImportError:
    import pymysql

    pymysql.install_as_MySQLdb()