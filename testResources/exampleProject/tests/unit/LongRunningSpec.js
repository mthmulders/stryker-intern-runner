const { describe, it } = intern.getPlugin('interface.bdd');

describe('Example', function() {
    it('should run very long', function() {
        // this.async();
        // setTimeout(() => {
            // done();
        // }, 2000);
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        });
    });
});
